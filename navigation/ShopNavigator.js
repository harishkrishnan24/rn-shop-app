import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import {
	createDrawerNavigator,
	DrawerItems,
	DrawerNavigatorItems,
} from "react-navigation-drawer";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import { Platform, SafeAreaView, Button, View } from "react-native";
import Colors from "../constants/Colors";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import userProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === "android" ? Colors.primary : "",
	},
	headerTitleStyle: {
		fontFamily: "open-sans-bold",
	},
	headerBackTitleStyle: {
		fontFamily: "open-sans",
	},
	headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
	{
		ProductsOverview: ProductsOverviewScreen,
		ProductDetail: ProductDetailScreen,
		Cart: CartScreen,
	},
	{
		defaultNavigationOptions: defaultNavOptions,
		navigationOptions: {
			drawerIcon: (drawerConfig) => (
				<Ionicons
					name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
					size={23}
					color={drawerConfig.tintColor}
				/>
			),
		},
	}
);

const OrdersNavigator = createStackNavigator(
	{
		Orders: OrdersScreen,
	},
	{
		defaultNavigationOptions: defaultNavOptions,
		navigationOptions: {
			drawerIcon: (drawerConfig) => (
				<Ionicons
					name={Platform.OS === "android" ? "md-list" : "ios-list"}
					size={23}
					color={drawerConfig.tintColor}
				/>
			),
		},
	}
);

const AdminNavigator = createStackNavigator(
	{
		UserProducts: userProductsScreen,
		EditProduct: EditProductScreen,
	},
	{
		defaultNavigationOptions: defaultNavOptions,
		navigationOptions: {
			drawerIcon: (drawerConfig) => (
				<Ionicons
					name={Platform.OS === "android" ? "md-create" : "ios-create"}
					size={23}
					color={drawerConfig.tintColor}
				/>
			),
		},
	}
);

const ShopNavigator = createDrawerNavigator(
	{
		Products: ProductsNavigator,
		Orders: OrdersNavigator,
		Admin: AdminNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colors.primary,
		},
		contentComponent: (props) => {
			const dispatch = useDispatch();
			return (
				<View style={{ flex: 1, padding: 20 }}>
					<SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
						<DrawerNavigatorItems {...props} />
						<Button
							title='Logout'
							color={Colors.primary}
							onPress={() => {
								dispatch(authActions.logout());
							}}
						/>
					</SafeAreaView>
				</View>
			);
		},
	}
);

const AuthNavigator = createStackNavigator(
	{
		Auth: AuthScreen,
	},
	{
		defaultNavigationOptions: defaultNavOptions,
	}
);

const MainNavigator = createSwitchNavigator({
	Startup: StartupScreen,
	Auth: AuthNavigator,
	Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
