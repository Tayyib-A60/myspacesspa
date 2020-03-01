import { UserState } from './user.reducers';
import { SpaceState } from '../spaces/state/space.reducers';
import { BookingState } from './booking/booking.reducer';

export interface AppState {
    user: UserState,
    spaces: SpaceState,
    booking: BookingState
};