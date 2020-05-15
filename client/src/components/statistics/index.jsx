import React from 'react';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getObjectFromLocalStorage } from '../../services/localStorageHelper';
import { getFightsForUser } from '../../services/domainRequest/fightRequest';

import './statistics.css';

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fights: [],
    };
  }

  async componentDidMount() {
    const user = getObjectFromLocalStorage('user');
    const fights = await getFightsForUser(user.id);
    if (fights && !fights.error) {
      this.setState({ fights: fights });
    }
  }

  render() {
    const { fights } = this.state;
    const { onCloseStats } = this.props;

    const rows = fights.map((fight, id) => ({
      number: id + 1,
      winner: fight.winner,
      loser: fight.loser,
      date: new Date(fight.date).toLocaleDateString(),
    }));

    return (
      <div className="container">
        <Button onClick={onCloseStats} variant="contained" color="primary">
          Back to Menu
        </Button>
        <div className="table">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Fight Number</TableCell>
                  <TableCell align="right">Winner</TableCell>
                  <TableCell align="right">Loser</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.number}>
                    <TableCell component="th" scope="row">
                      {row.number}
                    </TableCell>
                    <TableCell align="right">{row.winner}</TableCell>
                    <TableCell align="right">{row.loser}</TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}
