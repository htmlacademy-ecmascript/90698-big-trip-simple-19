import NewPointButtonView from './view/new-point-button-view.js';
import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import { render } from './framework/render.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic tB5yuM57gbn76za2j';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const sitePageElement = document.querySelector('.page-body');
const siteHeaderElement = document.querySelector('.trip-main');
const siteBoardContainerElement = sitePageElement.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');
const destinationsModel = new DestinationsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const listPresenter = new ListPresenter({boardContainer: siteBoardContainerElement, pointsModel, filterModel,
  destinationsModel,
  offersModel,
  onNewEventDestroy: handleNewEventFormClose});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersContainer,
  filterModel,
  pointsModel
});

const newEventButtonComponent = new NewPointButtonView({
  onClick: handleNewEventButtonClick
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  listPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

Promise.all([
  offersModel.init(),
  destinationsModel.init(),
  pointsModel.init()
]).catch(() => {
  newEventButtonComponent.element.disabled = true;
}).finally(() => {
  render(newEventButtonComponent, siteHeaderElement);
});
filterPresenter.init();

//render(newEventButtonComponent, siteHeaderElement);

listPresenter.init();

