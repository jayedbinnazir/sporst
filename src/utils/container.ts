// src/utils/container.ts
// import { PlanService } from '../modules/plans/services/PlanService';
// import { PaymentService } from '../modules/payments/services/PaymentService';
// import { ProfileService } from '../modules/profile/services/ProfileService';
// import { PlayerService } from '../modules/players/services/PlayerService';

import { AuthService } from "../modules/auth/services/AuthService";

console.log(new AuthService())

const container = {
  authService: new AuthService(),
//   planService: new PlanService(),
//   paymentService: new PaymentService(),
//   profileService: new ProfileService(),
//   playerService: new PlayerService(),
};

export default container;