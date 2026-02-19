import { Stack } from "expo-router";

const CategoryLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#60ad52",
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: "#fff",
        },
      }}
    > 
      
      <Stack.Screen
        name="index"
        options={{ title: "Select a Category" }}
      />
      <Stack.Screen
        name="[category]/index"
        options={{ title: "Resources" }}
      />
    </Stack>
  );
};

export default CategoryLayout;
