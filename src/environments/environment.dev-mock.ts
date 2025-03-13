const basePath = 'https://localhost:5001';
const basePath2 = 'http://localhost:3500';
export const environment = {
  production: false,
  user: {
    login: `${basePath}/auth/login/`,
    register: `${basePath}/auth/register/`,
    information: `${basePath2}/users/information/`,
  },
  products: `${basePath}/product`,
  workflows: {
    pending: `${basePath2}/workflows/pending-approvals/`,
    submitted: `${basePath2}/workflows/submitted-approvals/`,
  },
  parameters: {
    queryAllParameters: `${basePath2}/parameters/query/`,
    details: `${basePath2}/parameters/parameter/`,
    addParameter: `${basePath2}/parameters/add-parameter-table/`,
    completeTask: `${basePath2}/parameters/complete-task/`,
  },
  flexConditions: {
    queryAllConditions: `${basePath2}/flex-conditions/query/`,
    details: `${basePath2}/flex-conditions/flex-condition-table/`,
    completeTask: `${basePath2}/flex-conditions/complete-task/`,
    paymentProduct: `${basePath2}/flex-conditions/payment-product/`,
    modality: `${basePath2}/flex-conditions/modality/`,
    addFlex: `${basePath2}/flex-conditions/add-flex-condition-table/`,
  },
};
