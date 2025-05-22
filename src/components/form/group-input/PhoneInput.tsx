import { useState } from "react";

interface CountryCode {
  code: string; // e.g. "GH"
  dialCode: string; // e.g. "+233"
}

interface PhoneInputProps {
  countries: CountryCode[];
  placeholder?: string;
  onChange: (phoneNumber: string) => void;
  selectPosition?: "start" | "end";
  value: string; // controlled input
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  countries,
  placeholder = "+233 123 456 789",
  onChange,
  selectPosition = "start",
  value,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>(
    countries[0]?.code || ""
  );

  const countryCodes: Record<string, string> = countries.reduce(
    (acc, { code, dialCode }) => ({ ...acc, [code]: dialCode }),
    {}
  );

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setSelectedCountry(newCountry);
    const newDialCode = countryCodes[newCountry];

    // If user selects a new country, prepend the dial code to the current number (optional logic)
    onChange(`${newDialCode}`);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    if (onChange) {
      onChange(onlyDigits);
    }
  };

  return (
    <div className="relative flex">
      {/* Dropdown: Start */}
      {selectPosition === "start" && (
        <div className="absolute">
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="appearance-none rounded-l-lg border-0 border-r border-gray-200 bg-transparent py-3 pl-3.5 pr-8 text-gray-700 dark:border-gray-800 dark:text-gray-400"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.code}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center text-gray-700 dark:text-gray-400 pointer-events-none">
            <svg
              className="stroke-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Phone input field */}
      <input
        type="tel"
        value={value}
        onChange={handlePhoneNumberChange}
        placeholder={placeholder}
        className={`h-11 w-full ${
          selectPosition === "start" ? "pl-[84px]" : "pr-[84px]"
        } rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white`}
      />

      {/* Dropdown: End */}
      {selectPosition === "end" && (
        <div className="absolute right-0">
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="appearance-none rounded-r-lg border-0 border-l border-gray-200 bg-transparent py-3 pl-3.5 pr-8 text-gray-700 dark:border-gray-800 dark:text-gray-400"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.code}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center text-gray-700 dark:text-gray-400 pointer-events-none">
            <svg
              className="stroke-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
