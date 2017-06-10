import { ActionTypes } from './actions';

const initialState = {
	collection: {}
};

const discoverReduer = (state = initialState, action = {}) => {
	switch (action.type) {
		// TODO: should move the logic to data fetch layer?
		case ActionTypes.GET_COLLECTION: {
			return {
				...state,
				collection: action.payload
			};
		}
		case ActionTypes.LIKE: {
			const { likedId } = action.payload;
			return {
				collection: {
					...state.collection,
					[likedId]: {
						...collection[likedId],
						isLike: true
					}
				}
			}
		}
		case ActionTypes.REVOKE_LIKE: {
			const { likedId } = action.payload;
			return {
				collection: {
					...state.collection,
					[likedId]: {
						...collection[likedId],
						isLike: false
					}
				}
			}
		}
	}

};

export default discoverReduer;
