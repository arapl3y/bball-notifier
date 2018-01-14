const axios = require('axios');

const headers = {
    'Origin': 'https://www.sbl.com.au',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9,la;q=0.8',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Referer': 'https://www.sbl.com.au/team.html?team=5164',
    'Connection': 'keep-alive',
    'DNT': '1',
    'x-api-key': 'JWzX2s1XDq501L879TtFCel8nebvIO9925ZTGETf'
};

exports.getRounds = async () => {
  const response = await axios({
    method: 'post',
    url: 'https://lq9ek7vux0.execute-api.ap-southeast-2.amazonaws.com/prod/sbl_get_team_nfo',
    data: {
      team: '5164',
      season: '15'
    },
    headers
  });
  
  const data = response.data;
  
  const rounds = Object.values(data.data.rounds);

  return rounds;
}

if (require.main === module) {
  console.log("TEST");
  (async () => {
    let result = await exports.getNextMatch();
    console.log(result);
  })();
}