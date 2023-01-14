import BoardView from '../view/board-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class ListPresenter {
  boardComponent = new BoardView();
  taskListComponent = new ListView();

  constructor({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());
    render(this.taskListComponent, this.boardComponent.getElement());
    render(new EditPointView({point: this.boardPoints[0]}), this.taskListComponent.getElement());

    for (let i = 1; i < this.boardPoints.length; i++) {
      render(new PointView({point: this.boardPoints[i]}), this.taskListComponent.getElement());
    }
  }
}
