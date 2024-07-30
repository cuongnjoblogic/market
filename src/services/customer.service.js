import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "../views/Customer/constant.js";
import callApi from "./baseApi/index.js";

const defaultPayload = {
  SearchTerm: "",
  PageIndex: DEFAULT_PAGE_INDEX,
  PageSize: DEFAULT_PAGE_SIZE,
  OrderBy: 0,
};

const dataMock = {
  "additionalData": {
    "customers": [
      {
        "id": 4873817,
        "name": "Kami ON 247",
        "active": true,
        "address1": null,
        "address2": null,
        "address3": null,
        "address4": null,
        "address": "",
        "postCode": null,
        "contact": "Kami 1",
        "emailAddress": "nhant@joblogic.com",
        "telephone": "",
        "accountNumber": null,
        "customReference": null,
        "customerTelephone": null,
        "accountManager": "",
        "accountManagerId": null
      },
      {
        "id": 4872662,
        "name": "Microair",
        "active": true,
        "address1": "7 Pymmes Gardens South, London",
        "address2": "",
        "address3": "",
        "address4": "",
        "address": "7 Pymmes Gardens South, London",
        "postCode": "N9 9NT",
        "contact": "",
        "emailAddress": "",
        "telephone": "",
        "accountNumber": "",
        "customReference": "",
        "customerTelephone": "",
        "accountManager": "",
        "accountManagerId": null
      },
      {
        "id": 4872655,
        "name": "Moondust Electronics",
        "active": true,
        "address1": "4 Highgate Avenue, Walsall",
        "address2": "",
        "address3": "",
        "address4": "",
        "address": "4 Highgate Avenue, Walsall",
        "postCode": "WS1 3BH",
        "contact": "",
        "emailAddress": "",
        "telephone": "",
        "accountNumber": "",
        "customReference": "",
        "customerTelephone": "",
        "accountManager": "",
        "accountManagerId": null
      },
      {
        "id": 4872640,
        "name": "Motionavigations",
        "active": true,
        "address1": "23 Nottingham Close, Doncaster",
        "address2": "",
        "address3": "",
        "address4": "",
        "address": "23 Nottingham Close, Doncaster",
        "postCode": "DN5 8PH",
        "contact": "",
        "emailAddress": "",
        "telephone": "",
        "accountNumber": "",
        "customReference": "",
        "customerTelephone": "",
        "accountManager": "",
        "accountManagerId": null
      },
      {
        "id": 4872646,
        "name": "Mount Motors",
        "active": true,
        "address1": "Flat 4, Orme House, Tilburstow Hill Road, South Godstone",
        "address2": "",
        "address3": "",
        "address4": "",
        "address": "Flat 4, Orme House, Tilburstow Hill Road, South Godstone",
        "postCode": "RH9 8NN",
        "contact": "",
        "emailAddress": "",
        "telephone": "",
        "accountNumber": "",
        "customReference": "",
        "customerTelephone": "",
        "accountManager": "",
        "accountManagerId": null
      },
      {
        "id": 4872602,
        "name": "Nha Trang",
        "active": true,
        "address1": null,
        "address2": null,
        "address3": "Nha Trang",
        "address4": "Khánh Hòa",
        "address": "Nha Trang, Khánh Hòa",
        "postCode": null,
        "contact": " ",
        "emailAddress": null,
        "telephone": null,
        "accountNumber": null,
        "customReference": null,
        "customerTelephone": null,
        "accountManager": "",
        "accountManagerId": null
      },
      {
        "id": 4872637,
        "name": "Night Entertainment",
        "active": true,
        "address1": "40 Hardmans Road, Whitefield",
        "address2": "",
        "address3": "",
        "address4": "",
        "address": "40 Hardmans Road, Whitefield",
        "postCode": "M45 7BD",
        "contact": "",
        "emailAddress": "",
        "telephone": "",
        "accountNumber": "",
        "customReference": "",
        "customerTelephone": "",
        "accountManager": "",
        "accountManagerId": null
      },
      {
        "id": 4872652,
        "name": "Owlgate",
        "active": true,
        "address1": "Flat 60, Nayland Court, Market Place, Romford",
        "address2": "",
        "address3": "",
        "address4": "",
        "address": "Flat 60, Nayland Court, Market Place, Romford",
        "postCode": "RM1 3EF",
        "contact": "",
        "emailAddress": "",
        "telephone": "",
        "accountNumber": "",
        "customReference": "",
        "customerTelephone": "",
        "accountManager": "",
        "accountManagerId": null
      },
      {
        "id": 4872664,
        "name": "Petalsearch",
        "active": true,
        "address1": "31 Stormont Way, Chessington",
        "address2": "",
        "address3": "",
        "address4": "",
        "address": "31 Stormont Way, Chessington",
        "postCode": "KT9 2QW",
        "contact": "",
        "emailAddress": "",
        "telephone": "",
        "accountNumber": "",
        "customReference": "",
        "customerTelephone": "",
        "accountManager": "",
        "accountManagerId": null
      },
      {
        "id": 4872688,
        "name": "q3456",
        "active": true,
        "address1": null,
        "address2": null,
        "address3": null,
        "address4": null,
        "address": "",
        "postCode": null,
        "contact": " ",
        "emailAddress": null,
        "telephone": null,
        "accountNumber": null,
        "customReference": null,
        "customerTelephone": null,
        "accountManager": "",
        "accountManagerId": null
      }
    ],
    "batchDeleteAllowed": false,
    "hasBatchDeletePermission": false,
    "pageSize": 10,
    "pageIndex": 1,
    "totalCount": 24,
    "pageSizeOptions": [
      {
        "text": "5 Results per page",
        "value": "5"
      },
      {
        "text": "10 Results per page",
        "value": "10"
      },
      {
        "text": "20 Results per page",
        "value": "20"
      },
      {
        "text": "30 Results per page",
        "value": "30"
      },
      {
        "text": "50 Results per page",
        "value": "50"
      }
    ]
  },
  "success": true,
  "errors": [],
  "message": null,
  "warningMessage": null,
  "redirectUrl": null,
  "validationData": null,
  "itemValidations": null
}

export const getCustomerList = async (payload = {}) => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dataMock)
      }, 500)
    })
    // const res = await callApi.post("/api/SuspendCustomer/SearchJsonData", {
    //   ...defaultPayload,
    //   ...payload,
    // });
    // return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const suspendCustomer = async (customerId) => {
  try {
    const res = await callApi.post("/api/SuspendCustomer/Suspend", {
      customerId,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
