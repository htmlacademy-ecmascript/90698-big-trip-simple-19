import {render} from './framework/render.js';
import FilterView from './view/filter-view.js';
import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';
import { generateFilter } from './mock/filter.js';

const pointsModel = new PointsModel();

const sitePageElement = document.querySelector('.page-body');
const siteHeaderElement = document.querySelector('.trip-main');
const siteBoardContainerElement = sitePageElement.querySelector('.trip-events');
const listPresenter = new ListPresenter({boardContainer: siteBoardContainerElement, pointsModel});
const filters = generateFilter(pointsModel.points);

render(new FilterView({filters}), siteHeaderElement);
listPresenter.init();


