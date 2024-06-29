import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveBestSellers = createSelector(selectHomePage, (HomePage) => HomePage.bestSellers);

export const retrieveNewArrivals = createSelector(selectHomePage, (HomePage) => HomePage.newArrivals);
