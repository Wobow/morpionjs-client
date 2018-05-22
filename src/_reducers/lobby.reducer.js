import { lobbyConstants } from "../_constants";

export function lobbies(state = {}, action) {
  switch (action.type) {
    // Get All Lobbies
    case lobbyConstants.LOBBY_GETALL_REQUEST:
      return {
        loading: true
      };
    case lobbyConstants.LOBBY_GETALL_SUCCESS:
      return {
        items: action.lobbys
      };
    case lobbyConstants.LOBBY_GETALL_FAILURE:
      return {
        error: action.error
      };

    // Get One Lobby
    case lobbyConstants.LOBBY_GET_REQUEST:
      return {
        loading: true
      };
    case lobbyConstants.LOBBY_GET_SUCCESS:
      return {
        items: action.lobbys
      };
    case lobbyConstants.LOBBY_GET_FAILURE:
      return {
        error: action.error
      };

    // Join Lobby
    case lobbyConstants.LOBBY_JOIN_REQUEST:
      return {
        loading: true
      };
    case lobbyConstants.LOBBY_JOIN_SUCCESS:
      return {
        items: action.resourceLink
      };
    case lobbyConstants.LOBBY_JOIN_FAILURE:
      return {
        error: action.error
      };

    // Leave Lobby
    case lobbyConstants.LOBBY_LEAVE_REQUEST:
      return {
        loading: true
      };
    case lobbyConstants.LOBBY_LEAVE_SUCCESS:
      return {
        items: action.resourceLink
      };
    case lobbyConstants.LOBBY_LEAVE_FAILURE:
      return {
        error: action.error
      };

    // Delete Lobby
    case lobbyConstants.LOBBY_DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(
          lobby =>
            lobby.id === action.id ? { ...lobby, deleting: true } : lobby
        )
      };
    case lobbyConstants.LOBBY_DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(lobby => lobby.id !== action.id)
      };
    case lobbyConstants.LOBBY_DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(lobby => {
          if (lobby.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...lobbyCopy } = lobby;
            // return copy of user with 'deleteError:[error]' property
            return { ...lobbyCopy, deleteError: action.error };
          }

          return lobby;
        })
      };
    default:
      return state;
  }
}