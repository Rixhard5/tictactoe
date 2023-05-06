import { Component } from '@angular/core';

import { Gamelogic } from '../gamelogic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic]
})
export class GameComponent {

  constructor(public game: Gamelogic) {

  }

  startGame(): void {
    this.game.gameStart();
    const currentPlayer = 'Current turn: <b>Player ' + this.game.currentTurn + '</b>';
    const information: any = document.querySelector('.current-status');
    information.innerHTML = currentPlayer;
  }

  async clickSubfield(subfield: any): Promise<void> {
    if (this.game.gameStatus === 1) {
      const position = subfield.currentTarget.getAttribute('position');
      const information: any = document.querySelector('.current-status');
      console.log(position);

      this.game.setField(position, this.game.currentTurn);
      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);

      await this.game.checkGameEndWinner().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          information.innerHTML = 'The winner is player number <b>' + this.game.currentTurn + '</b>.';
        }
      });

      await this.game.checkGameEndFull().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          information.innerHTML = 'No winner, draw';
        }
      });

      this.game.changePlayer();

      if (this.game.gameStatus === 1) {
        const currentPlayer = 'Current turn: <b>Player ' + this.game.currentTurn + '</b>';
        information.innerHTML = currentPlayer;
      }
    }
  }

}
