import * as yup from 'yup'

export const authSchema = yup.object({
        name: yup
            .string()
            .typeError('Поле должно быть строкой')
            .required('Это поле обязательно')
            .min(3, 'Минимальное количество символов - 3')
            .max(10, 'Максимальное количество символов - 10'),
        password: yup
            .string()
            .typeError('Поле должно быть строкой')
            .required('Это поле обязательно')
            .min(3, 'Минимальное количество символов - 3')
            .max(10, 'Максимальное количество символов - 10'),
});

export const refreshSchema = yup.object({
        token: yup
          .string()
          .typeError('Поле должно быть строкой')
          .required('Это поле обязательно')
          .min(3, 'Минимальное количество символов - 3')
});
