import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { IRegisterDto } from "../../types/auth.types";
import InputField from "../../components/general/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../hooks/useAuth.hook";
import Button from "../../components/general/Button";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PATH_PUBLIC } from "../../routes/paths";

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { register } = useAuth();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const registerScheme = Yup.object().shape({
    firstName: Yup.string().required("Поле обязательно для заполнения!!"),
    lastName: Yup.string().required("Поле обязательно для заполнения!!"),
    userName: Yup.string().required("Поле обязательно для заполнения!!"),
    email: Yup.string()
      .required("Поле обязательно для заполнения!!")
      .email("Email должен быть валидным!"),
    password: Yup.string()
      .required("Поле обязательно для заполнения!!")
      .min(8, "Пароль должен содержать не менее 8 символов!"),
    address: Yup.string().required("Поле обязательно для заполнения!!"),
    numberPhone: Yup.string()
      .required("Поле обязательно для заполнения!!")
      .matches(phoneRegExp, "Номер должен быть правильным!"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegisterDto>({
    resolver: yupResolver(registerScheme),
    defaultValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      address: '',
      numberPhone: '',
    },
  });

  const onSubmitRegisterForm = async (data: IRegisterDto) => {
    try {
      setLoading(true);
      await register(
        data.firstName,
        data.lastName,
        data.userName,
        data.email,
        data.address,
        data.password,
        data.numberPhone
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = error as { data: string; status: number };
      const { status, data } = err;

      if (status === 400 || status === 409) toast.error(data);
      else
        toast.error(
          "Неизвестная ошибка, пожалуйста, свяжитесь с администратором"
        );
    }
  };

  return (
    <div className="pageTemplate1">
      <div className="max-sm:hidden flex-1 min-h-[700px] h-4/5 bg-gradient-to-tr from-[#DAC6FB] via-amber-400 to-[#AAC1F6] flex flex-col justify-center items-center rounded-l-2xl">
        <div className="h-3/5 p-6 rounded-2xl flex flex-col gap-8 justify-center items-start bg-white bg-opacity-20 border border-[#ffffff55] relative">
          <h1 className="text-6xl font-bold text-[#754eb4]">
            Chiptuning App
          </h1>
          <h1 className="text-3xl font-bold text-[#754eb490]">
            Страница регистрации
          </h1>
          <h4 className="text-3xl font-semibold text-white">
            Приложение для работы с клиентами
          </h4>
          <div className="absolute -top-20 right-20 w-48 h-48 bg-gradient-to-br from-[#ef32d9]  to-[#89fffd] rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-[#cc2b5e] to-[#753a88] rounded-full blur-3xl"></div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmitRegisterForm)}
        className='flex-1 min-h-[700px] h-4/5 bg-[#f0ecf7] flex flex-col justify-center items-center rounded-r-2xl'
      >
        <h1 className="text-4xl font-bold mb-2 text-[#754eb4]">Регистрация</h1>
        <InputField
          control={control}
          label="Имя"
          inputName="Имя"
          error={errors.firstName?.message}
        />
        <InputField
          control={control}
          label="Фамилия"
          inputName="Фамилия"
          error={errors.lastName?.message}
        />
        <InputField
          control={control}
          label="Номер телефона"
          inputName="Номер телефона"
          error={errors.numberPhone?.message}
        />
        <InputField
          control={control}
          label="Имя пользователя"
          inputName="Имя пользователя"
          error={errors.userName?.message}
        />
        <InputField
          control={control}
          label="Email"
          inputName="Email"
          error={errors.email?.message}
        />
        <InputField
          control={control}
          label="Пароль"
          inputName="Пароль"
          inputType="password"
          error={errors.password?.message}
        />
        <InputField
          control={control}
          label="Адрес"
          inputName="Адрес"
          error={errors.address?.message}
        />

        <div className="px-4 mt-2 mb-6 w-9/12 flex gap-2">
          <h1>У Вас уже есть аккаунт?</h1>
          <Link
            to={PATH_PUBLIC.login}
            className="text-[#754eb4] border border-[#754eb4] hover:shadow-[0_0_5px_2px_#754eb44c] px-3 rounded-2xl duration-200"
            
          >
            Войти
          </Link>
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="secondary"
            type="button"
            label="Очистить"
            onClick={() => reset()}
          />
          <Button
            variant="primary"
            type="submit"
            label="Отправить"
            onClick={() => {}}
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
