import { useState, useCallback, useRef } from "react";

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

    const timers = useRef<{ [key: string]: ReturnType<typeof setTimeout> }>({});

  const triggerAlert = (setAlert: (val: boolean) => void, key: string, duration = 2360) => {
    setAlert(true);
    if (timers.current[key]) clearTimeout(timers.current[key]);
    timers.current[key] = setTimeout(() => setAlert(false), duration);
  };

  const validationForm = useCallback(({
    firstName,
    secondName,
    passwordUser,
    birthday,
    countryUser,
    customCountry,
  }: ValidationProps): boolean => {
    let isValid = true;

    if (firstName.length > 50 || secondName.length > 50 || passwordUser.length > 100) {
      return false;
    }

    if (!firstName.trim() || !secondName.trim()) {
      isValid = false;
      triggerAlert(setContainerName, "name");
    }

    const hasUpper = /[A-Z]/.test(passwordUser);
    const hasLower = /[a-z]/.test(passwordUser);
    if (passwordUser.length < 8 || !hasUpper || !hasLower) {
      triggerAlert(setContainerPassword, "password");
      isValid = false;
    }

    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexData.test(birthday)) {
      triggerAlert(setContainerBirthday, "birthday", 3000);
      isValid = false;
    } else {
      const [dayStr, monthStr, yearStr] = birthday.split("/");
      const day = parseInt(dayStr, 10);
      const month = parseInt(monthStr, 10) - 1;
      const year = parseInt(yearStr, 10);
      const thisYear = new Date().getFullYear();

      const dateCheck = new Date(year, month, day);

      if (
        year < 1920 || 
        year > thisYear ||
        dateCheck.getFullYear() !== year ||
        dateCheck.getMonth() !== month ||
        dateCheck.getDate() !== day
      ) {
        triggerAlert(setContainerBirthday, "birthday");
        isValid = false;
      }
    }

    const finallyCountry = countryUser === "Outros" ? customCountry : countryUser;
    if (!finallyCountry || finallyCountry.trim() === "") {
      triggerAlert(setContainerCountry, "country");
      isValid = false;
    }

    return isValid;
  }, []);

  return {
    validationForm,
    containerName,
    containerPassword,
    containerBirthday,
    containerCountry,
  };
};