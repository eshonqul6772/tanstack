import * as yup from 'yup';

export const MultiNameValidate = yup.object().shape({
  uz: yup.string().required(),
  ru: yup.string().required(),
  en: yup.string().required(),
});
