// src/hooks/useFormValidation.ts
import { useState } from "react";

interface ValidationProps {
  firstName: string;
  secondName: string;
  passwordUser: string;
  birthday: string;
  countryUser: string;
  customCountry: string;
}

export const useFormValidation = () => {
  const [containerName, setContainerName] = useState<boolean>(false);
  const [containerPassword, setContainerPassword] = useState<boolean>(false);
  const [containerBirthday, setContainerBirthday] = useState<boolean>(false);
  const [containerCountry, setContainerCountry] = useState<boolean>(false);
  

  const validationForm = ({
    firstName,
    secondName,
    passwordUser,
    birthday,
    countryUser,
    customCountry,
  }: ValidationProps) => {
    let isValid = true;

    if (firstName.trim() === "" || secondName.trim() === "") {
      isValid = false;
      setContainerName(true);
    }
    setTimeout(() => setContainerName(false), 2360);

    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!regexSenha.test(passwordUser)) {
      setContainerPassword(true);
      isValid = false;
    }
    setTimeout(() => setContainerPassword(false), 2360);


    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexData.test(birthday)) {
      setContainerBirthday(true);
      isValid = false;
      setTimeout(() => setContainerBirthday(false), 3000);
    } else {
      const [dayStr, mounthStr, yearStr] = birthday.split("/");
      const day = parseInt(dayStr, 10);
      const mounth = parseInt(mounthStr, 10);
      const year = parseInt(yearStr, 10);
      const thisYear = new Date().getFullYear();

      if (day < 1 || day > 31 || mounth < 1 || mounth > 12 || year < 1920 || year > thisYear) {
        setContainerBirthday(true);
        isValid = false;
        setTimeout(() => setContainerBirthday(false), 2360);
      }
    }


    const finallyCountry = countryUser === "Outros" ? customCountry : countryUser;
    if (finallyCountry.trim() === "") {
      setContainerCountry(true);
      isValid = false;
    }
    setTimeout(() => setContainerCountry(false), 2360);

    return isValid;
  };


  return {
    validationForm,
    containerName,
    containerPassword,
    containerBirthday,
    containerCountry,
  };
};