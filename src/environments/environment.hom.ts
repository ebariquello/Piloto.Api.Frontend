const basePath =
  'https://mbdqc9ii78-vpce-0833e05650b9ef977.execute-api.us-east-1.amazonaws.com/hml/discount-parameters/v1';

export const environment = {
  production: false,
  user: {
    login: `${basePath}/auth/login/`,
    information: `${basePath}/users/information/`,
  },
  products: `${basePath}/product/`,
  workflows: {
    pending: `${basePath}/workflows/pending-approvals/`,
    submitted: `${basePath}/workflows/submitted-approvals/`,
  },
  parameters: {
    queryAllParameters: `${basePath}/parameters/query/`,
    details: `${basePath}/parameters/parameter/`,
    addParameter: `${basePath}/parameters/add-parameter-table/`,
    completeTask: `${basePath}/parameters/complete-task/`,
  },
  flexConditions: {
    queryAllConditions: `${basePath}/flex-conditions/query/`,
    details: `${basePath}/flex-conditions/flex-condition-table/`,
    completeTask: `${basePath}/flex-conditions/complete-task/`,
    paymentProduct: `${basePath}/flex-conditions/payment-product/`,
    modality: `${basePath}/flex-conditions/modality/`,
    addFlex: `${basePath}/flex-conditions/add-flex-condition-table/`,
  },
};
