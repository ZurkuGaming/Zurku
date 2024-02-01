let fetch;

import('node-fetch').then(nodeFetch => {
  fetch = nodeFetch.default;

  const webhookUrl = 'https://discord.com/api/webhooks/1196689837105889311/58Rq6reERzIcuzOg0qZNUKBqMXhq1MVxpMQx_MbMbB3hNKJY9tMRftRDFL4Yl6scjVw5';
  const messageId = '1196714757298860133';

  const body = {
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            label: 'Rules',
            style: 2,
            custom_id: 'rules',
          },
          {
            type: 2,
            label: 'Roles',
            style: 2,
            custom_id: 'roles',
          },
          {
            type: 2,
            label: 'Commands',
            style: 2,
            custom_id: 'commands',
          },
        ],
      },
    ],
  };

  fetch(`${webhookUrl}/messages/${messageId}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
});