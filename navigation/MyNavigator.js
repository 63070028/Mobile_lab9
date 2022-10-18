import React from "react";
import { StyleSheet } from "react-native";
// import คอมโพเนนต์ที่จำเป็น
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

// import library ที่จำเป็น
import { Ionicons } from '@expo/vector-icons'; 

// import screen ที่เกี่ยวข้อง
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

// สร้าง navigator ตามโจทย์กำหนด
const MealsNavigator = createNativeStackNavigator();
const MealsFavTabNavigator = createBottomTabNavigator();
const FavNavigator = createNativeStackNavigator();
const FiltersNavigator = createNativeStackNavigator();
const MainNavigator = createDrawerNavigator();


// สร้าง function สำหรับการกำหนด Navigator แต่ละตัว เช่น
function MyMealsNavigator() {
  return (
    <MealsNavigator.Navigator initialRouteName="Categories" screenOptions={{headerStyle: { backgroundColor: "#4a148c", },
headerTintColor: "white",}}>
      <MealsNavigator.Screen name="Categories" component={CategoriesScreen} options={{title:"Meal Categories"}}/>
      <MealsNavigator.Screen name="CategoryMeals" component={CategoryMealsScreen} options={({route})=>({title:route.params.categoryTitle.toString(),})}/>
      <MealsNavigator.Screen name="MealDetail" component={MealDetailScreen}/>
    </MealsNavigator.Navigator>
  );
}

function MyMealsFavTabNavigator() {
  return (
    <MealsFavTabNavigator.Navigator>
      <MealsFavTabNavigator.Screen name="Meals" component={MyMealsNavigator} options={{
  tabBarIcon: ({ color, size }) => {
  return <Ionicons name="ios-restaurant" size={24} color="black" />;
  },headerShown: false
  }} />

      <MealsFavTabNavigator.Screen name="Favorites_MealsFav" component={MyFavNavigator}options={{
  tabBarIcon: ({ color, size }) => {
  return <Ionicons name="ios-star" size={24} color="black" />;
  }, headerShown: false
  }} />
    </MealsFavTabNavigator.Navigator>
    );
}

function MyFavNavigator(){
  return(
    <FavNavigator.Navigator>
      <FavNavigator.Screen name="Favorites" component={FavoritesScreen}/>
      <FavNavigator.Screen name="MealDetail" component={MealDetailScreen}/>
    </FavNavigator.Navigator>
  )
}

function MyFiltersNavigator(){
  return(
    <FiltersNavigator.Navigator>
      <FiltersNavigator.Screen name="Filters" component={FiltersScreen}/>
    </FiltersNavigator.Navigator>
  )
}

// สร้าง Navigator หลัก
export default function MyNavigator() {
  return (
    <NavigationContainer>
      {/* รายละเอียดของ Navigator หลัก (MainNavigator) */}

    <MainNavigator.Navigator useLegacyImplementation={true} initialRouteName="MealsFav">
      <MainNavigator.Screen name="MealsFav" component={MyMealsFavTabNavigator} options={{drawerLabel:"Meal", headerShown: false}}/>
      <MainNavigator.Screen name="Filters_Main" component={MyFiltersNavigator} options={{drawerLabel:"Filters", headerShown: false}}/>
    </MainNavigator.Navigator>
    
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});