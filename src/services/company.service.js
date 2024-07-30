import callApi from "./baseApi/index.js";
import {handleRemoveAppToken, handleSetAppToken} from "./baseApi/handleAppToken.js";

export const getCompany = async () => {
  try {
    const res = await callApi.get(`/api/Company`);
    return res.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const getAppTokenByTenantId = async (id) => {
  try {
    const res = await callApi.get(`api/Company/access?tenantId=${id}`);
    const { accessToken } = res.data.additionalData?.token || {};
    handleSetAppToken(accessToken);
    return res.data;
  } catch (error) {
    handleRemoveAppToken();
    throw error.response?.data;
  }
};
