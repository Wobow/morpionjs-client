import { lobbyConstants } from "../_constants";
import { lobbyService } from "../_services";
import { alertActions, gameActions } from "./";
import { history } from "../_helpers";

export const lobbyActions = {
  create,
  getAll,
  getLobby,
  getLobbyUsers,
  getLobbyGames,
  joinLobby,
  leaveLobby,
  delete: _delete
};

function create(name) {
  return dispatch => {
    dispatch(request({ name }));

    lobbyService.createLobby(name).then(
      lobby => {
        if (res.status === "rejected") {
          dispatch(failure(lobby.message));
          dispatch(alertActions.error(lobby.message));
        } else {
          dispatch(success(lobby));
          dispatch(gameActions.getAll());
          history.push("/");
        }
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(lobby) {
    return { type: lobbyConstants.CREATE_REQUEST, lobby };
  }
  function success(lobby) {
    return { type: lobbyConstants.CREATE_SUCCESS, lobby };
  }
  function failure(error) {
    return { type: lobbyConstants.CREATE_FAILURE, error };
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    lobbyService
      .getLobbies()
      .then(
        lobbys => dispatch(success(lobbys)),
        error => dispatch(failure(error))
      );
  };

  function request() {
    return { type: lobbyConstants.LOBBY_GETALL_REQUEST };
  }
  function success(lobbys) {
    console.log("LOBBY SUCCESS");
    return { type: lobbyConstants.LOBBY_GETALL_SUCCESS, lobbys };
  }
  function failure(error) {
    return { type: lobbyConstants.LOBBY_GETALL_FAILURE, error };
  }
}

function getLobby(id) {
  return dispatch => {
    dispatch(request());

    lobbyService
      .getLobby(id)
      .then(
        lobby => dispatch(success(lobby)),
        error => dispatch(failure(error))
      );
  };

  function request() {
    return { type: lobbyConstants.LOBBY_GET_REQUEST };
  }
  function success(lobbys) {
    return { type: lobbyConstants.LOBBY_GET_SUCCESS, lobbys };
  }
  function failure(error) {
    return { type: lobbyConstants.LOBBY_GET_FAILURE, error };
  }
}

function getLobbyUsers(id) {
  return dispatch => {
    dispatch(request());

    lobbyService
      .getLobbyUsers(id)
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error))
      );
  };

  function request() {
    return { type: lobbyConstants.LOBBY_USERS_GET_REQUEST };
  }
  function success(lobbys) {
    return { type: lobbyConstants.LOBBY_USERS_GET_SUCCESS, lobbys };
  }
  function failure(error) {
    return { type: lobbyConstants.LOBBY_USERS_GET_FAILURE, error };
  }
}

function joinLobby(id) {
  return dispatch => {
    dispatch(request());

    lobbyService.joinLobby(id).then(
      res => {
        if (res.status === "rejected") {
          dispatch(failure(res.message));
          dispatch(alertActions.error(res.message));
        } else {
          dispatch(success(res));
        }
      },
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: lobbyConstants.LOBBY_JOIN_REQUEST };
  }
  function success(res) {
    return { type: lobbyConstants.LOBBY_JOIN_SUCCESS, res };
  }
  function failure(error) {
    return { type: lobbyConstants.LOBBY_JOIN_FAILURE, error };
  }
}

function leaveLobby(id) {
  return dispatch => {
    dispatch(request());

    lobbyService.leaveLobby(id).then(
      res => {
        dispatch(success(res));
      },
      error => {
        dispatch(gameActions.getAll());
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: lobbyConstants.LOBBY_LEAVE_REQUEST };
  }
  function success(res) {
    return { type: lobbyConstants.LOBBY_LEAVE_SUCCESS, res };
  }
  function failure(error) {
    return { type: lobbyConstants.LOBBY_LEAVE_FAILURE, error };
  }
}

function getLobbyGames(id) {
  return dispatch => {
    dispatch(request());

    lobbyService
      .getLobbyGames(id)
      .then(
        games => dispatch(success(games)),
        error => dispatch(failure(error))
      );
  };

  function request() {
    return { type: lobbyConstants.LOBBY_GAMES_GET_REQUEST };
  }
  function success(games) {
    return { type: lobbyConstants.LOBBY_GAMES_GET_SUCCESS, games };
  }
  function failure(error) {
    return { type: lobbyConstants.LOBBY_GAMES_GET_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    lobbyService.delete(id).then(
      lobby => {
        dispatch(success(id));
      },
      error => {
        dispatch(failure(id, error));
      }
    );
  };

  function request(id) {
    return { type: lobbyConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: lobbyConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: lobbyConstants.DELETE_FAILURE, id, error };
  }
}
