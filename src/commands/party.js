// src/commands/party.js
const Party = require('../models/partyData.js');
const UserData = require('../models/userData.js');
const generatePartyEmbed = require('../embeds/partyEmbed.js');

module.exports = {
    data: {
      name: 'party',
      description: 'Manage your party (%5 XP Boost!)',
      category: 'Economy',
      options: [
        {
          name: 'create',
          type: 1,
          description: 'Create a new party',
        },
        {
            name: 'join',
            type: 1,
            description: 'Join an existing party',
            options: [
              {
                name: 'id',
                type: 3, // STRING type
                description: 'The ID of the party to join',
                required: true,
              },
            ],
          },
          {
            name: 'kick',
            type: 1,
            description: 'Kick a user from your party',
            options: [
              {
                name: 'user',
                type: 6, // USER type
                description: 'The user to kick',
                required: true,
              },
            ],
          },
        {
          name: 'info',
          type: 1,
          description: 'Shows information about your party',
        },
        {
          name: 'leave',
          type: 1,
          description: 'Leave your current party',
        },
        {
          name: 'disband',
          type: 1,
          description: 'Disband your current party',
        },
      ],
    },
    async execute(interaction) {
      const subcommand = interaction.options.getSubcommand();
  
      switch (subcommand) {
        case 'create':
            // Check if the user is already in a party or is the leader of a party
            const existingPartyCreate = await Party.findOne({ $or: [{ leader: interaction.user.id }, { members: interaction.user.id }] });
            if (existingPartyCreate) {
              // If they are, send an ephemeral message
              await interaction.reply({ content: 'You are already in a party. You need to either leave or disband before creating a new one.', ephemeral: true });
            } else {
              // If they are not, create a new party
              const id = Math.random().toString(36).substr(2, 6).toUpperCase();
              const partyCreate = new Party({
                _id: id,
                leader: interaction.user.id,
              });
              try {
                await partyCreate.save();
                await interaction.reply({ content: `Party created with ID: ${id}`, ephemeral: true });
              } catch (err) {
                await interaction.reply({ content: `Error: ${err}`, ephemeral: true });
              }
            }
        break;
        case 'join':
            // Check if the user is already in a party or is the leader of a party
            const existingPartyJoin = await Party.findOne({ $or: [{ leader: interaction.user.id }, { members: interaction.user.id }] });
            if (existingPartyJoin) {
              // If they are, send an ephemeral message
              await interaction.reply({ content: 'You are already a leader or a member of another party.', ephemeral: true });
            } else {
              // Get the ID of the party to join
              const partyId = interaction.options.getString('id');
              // Find the party with the given ID
              const partyJoin = await Party.findById(partyId);
              if (!partyJoin) {
                // If there is no party with that ID, send an ephemeral message
                await interaction.reply({ content: 'No party found with the given ID.', ephemeral: true });
              } else if (partyJoin.members.length >= 9) {
                // If the party already has 9 members, send an ephemeral message
                await interaction.reply({ content: 'The party is already full.', ephemeral: true });
              } else {
                // If the party exists and is not full, add the user to the party
                partyJoin.members.push(interaction.user.id);
                try {
                  await partyJoin.save();
                  await interaction.reply({ content: `You have joined the party with ID: ${partyId}`, ephemeral: true });
                } catch (err) {
                  await interaction.reply({ content: `Error: ${err}`, ephemeral: true });
                }
              }
            }
        break;
        case 'kick':
            // Check if the user is the leader of a party
            const partyKick = await Party.findOne({ leader: interaction.user.id });
            if (!partyKick) {
              // If they are not the leader, send an ephemeral message
              await interaction.reply({ content: 'You are not the leader of a party.', ephemeral: true });
            } else {
              // Get the ID of the user to kick
              const userIdToKick = interaction.options.getUser('user').id;
              // Check if the user to kick is in the party
              const index = partyKick.members.indexOf(userIdToKick);
              if (index === -1) {
                // If the user to kick is not in the party, send an ephemeral message
                await interaction.reply({ content: 'The user is not in your party.', ephemeral: true });
              } else {
                // If the user to kick is in the party, remove them from the party's member list
                partyKick.members.splice(index, 1);
                try {
                  // Save the changes
                  await partyKick.save();
                  await interaction.reply({ content: 'The user has been kicked from the party.', ephemeral: true });
                } catch (err) {
                  await interaction.reply({ content: `Error: ${err}`, ephemeral: true });
                }
              }
            }
        break;
        case 'info':
            // Check if the user is in a party
            const party = await Party.findOne({ $or: [{ leader: interaction.user.id }, { members: interaction.user.id }] });
            if (!party) {
              // If they are not in a party, send an ephemeral message
              await interaction.reply({ content: 'You are not in a party.', ephemeral: true });
            } else {
                // Get the details of the leader
                const leader = await interaction.client.users.fetch(party.leader);
                const leaderData = await UserData.findOne({ userID: party.leader });
                const leaderDetails = {
                    name: `${leader.username} 👑`,
                    level: leaderData.level,
                    messages: leaderData.messageCount,
                    rep: leaderData.rep,
                    isLeader: true // Add this line
                };
        
              // Get the details of each member
              const memberDetails = await Promise.all(party.members.map(async memberId => {
                const member = await interaction.client.users.fetch(memberId);
                // Get the user data of the member
                const userData = await UserData.findOne({ userID: memberId });
                // Get the level, messages, and rep of the member
                const level = userData.level;
                const messages = userData.messageCount;
                const rep = userData.rep;
                return { name: member.username, level, messages, rep };
              }));
        
              // Add the leader to the top of the list
              memberDetails.unshift(leaderDetails);
        
              // Generate the embed message
              const embed = generatePartyEmbed(party._id, memberDetails);
              await interaction.reply({ embeds: [embed], ephemeral: true });
            }
        break;
        case 'leave':
                // Check if the user is in a party or is the leader of a party
                const partyLeave = await Party.findOne({ $or: [{ leader: interaction.user.id }, { members: interaction.user.id }] });
                if (!partyLeave) {
                  // If they are not in a party, send an ephemeral message
                  await interaction.reply({ content: 'You are not in a party.', ephemeral: true });
                } else if (partyLeave.leader === interaction.user.id) {
                  // If they are the leader of the party, send an ephemeral message
                  await interaction.reply({ content: 'You are the leader of the party. You can only disband the party.', ephemeral: true });
                } else {
                  // If they are not the leader, remove them from the party's member list
                  const index = partyLeave.members.indexOf(interaction.user.id);
                  if (index > -1) {
                    partyLeave.members.splice(index, 1);
                  }
                  try {
                    // Save the changes
                    await partyLeave.save();
                    await interaction.reply({ content: 'You have left the party.', ephemeral: true });
                  } catch (err) {
                    await interaction.reply({ content: `Error: ${err}`, ephemeral: true });
                  }
                }
        break;
        case 'disband':
            // Check if the user is the leader of a party
            const partyDisband = await Party.findOne({ leader: interaction.user.id });
            if (!partyDisband) {
              // If they are not the leader or not in a party, send an ephemeral message
              await interaction.reply({ content: 'You are not the leader of a party or not in a party.', ephemeral: true });
            } else {
              // If they are the leader, delete the party
              try {
                await Party.deleteOne({ _id: partyDisband._id });
                await interaction.reply({ content: 'Party disbanded successfully.', ephemeral: true });
              } catch (err) {
                await interaction.reply({ content: `Error: ${err}`, ephemeral: true });
              }
            }
          break;
        default:
          await interaction.reply(`Unknown subcommand: ${subcommand}`);
          break;
      }
    },
  };