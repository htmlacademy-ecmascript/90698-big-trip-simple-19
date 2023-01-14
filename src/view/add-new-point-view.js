import {createElement} from '../render.js';
import { destinations } from '../mock/destination.js';
import { humanizeStartDataTime } from '../utils.js';

function createEventTypeItemTemplate(offers) {
  const elementTypes = offers.map((element) => `
  <div class="event__type-item">
  <input id="event-type-${element.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element.type}">
  <label class="event__type-label  event__type-label--${element.type}" for="event-type-${element.type}-1">${element.type}</label>
</div>`).join('');

  return elementTypes;
}

const chooseDestination = destinations.map((element) => `<option value="${element.name}"></option>`).join('');

function createSectionOffersTemplate(type, offers) {
  const elementOffers = offers.map((element) => `
  <div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name=${element.title} ${offers.includes(element.id) ? 'checked' : ''}>
  <label class="event__offer-label" for="event-offer-$${type}-1">
    <span class="event__offer-title">${element.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${element.price}</span>
  </label>
</div>`).join('');

  return elementOffers;
}

function createAddNewPointTemplate(point) {
  const { offers, type, dateFrom, dateTo, basePrice } = point;
  const pointDestination = destinations.find((item) => point.destination === item.id);

  return `<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          ${createEventTypeItemTemplate(offers)}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value='${pointDestination.name}' list="destination-list-1">
      <datalist id="destination-list-1">
      ${chooseDestination}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeStartDataTime(dateFrom)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeStartDataTime(dateTo)}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
      ${createSectionOffersTemplate(type, offers)}
      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">'${pointDestination.description}'</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
        </div>
      </div>
    </section>
  </section>
</form>`;
}

export default class AddNewPointView {
  #element = null;
  #point = null;

  constructor({point}) {
    this.#point = point;
  }

  get template() {
    return createAddNewPointTemplate(this.#point);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
