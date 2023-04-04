const API =
  "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SndjbTltYVd4bFgzQnJJam8zTWprMk9UY3NJbTVoYldVaU9pSnBibWwwYVdGc0lpd2lZMnhoYzNNaU9pSk5aWEpqYUdGdWRDSjkuWlZZajlfSV9veTRnSkhsTlFmZmJxb3BwNTRiM01BaWJyV1RXOW9NamJpS2kzLUZNRWdyelQtZUkxVkc2MVpBdDgxRWhucXRwQ0Yxdk5PanB1Ny11WlE=";
const integrationID = 3694031;

async function firstStep(price) {
  let data = {
    api_key: API,
  };

  let request = await fetch("https://accept.paymob.com/api/auth/tokens", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  let response = await request.json();

  let token = response.token;
  // console.log(token);
  secondStep(token,price);
}

async function secondStep(token,price) {
  let data = {
    auth_token: token,
    delivery_needed: "false",
    amount_cents: price,
    currency: "EGP",
    items: [],
  };

  let request = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  let response = await request.json();

  let id = response.id;
  console.log(id);
  thirdStep(token, id,price);
}

async function thirdStep(token, id,price) {
  let data = {
    auth_token: token,
    amount_cents: price,
    expiration: 3600,
    order_id: id,
    billing_data: {
      apartment: "803",
      email: "claudette09@exa.com",
      floor: "42",
      first_name: "Clifford",
      street: "Ethan Land",
      building: "8028",
      phone_number: "+86(8)9135210487",
      shipping_method: "PKG",
      postal_code: "01898",
      city: "Jaskolskiburgh",
      country: "CR",
      last_name: "Nicolas",
      state: "Utah",
    },
    currency: "EGP",
    integration_id: integrationID,
  };

  let request = await fetch(
    "https://accept.paymob.com/api/acceptance/payment_keys",
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  let response = await request.json();

  let TheToken = response.token;
  console.log(TheToken);
  cardPayment(TheToken);
}

async function cardPayment(tokenfromstepThree) {
  let iframURL = `https://accept.paymob.com/api/acceptance/iframes/746425?payment_token=${tokenfromstepThree}`;

  window.location.href = iframURL;
}

export default firstStep
