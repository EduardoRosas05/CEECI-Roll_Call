import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Calendar } from "react-native-calendars";

export const Calen = () => {

  const [selectedDate, setSelectedDate] = useState("");

  const onDayPress = (day:any) => {
    setSelectedDate(day.dateString);

    console.log(day);
  };

  return (
    <SafeAreaView>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{ [selectedDate]: { selected: true } }}
      />
    </SafeAreaView>
  );
};
