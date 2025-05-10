import { Routes } from '@angular/router';
import { HomepageComponent } from './componenti/homepage/homepage.component';
import { GlobalTemperatureComponent } from './componenti/global-temperature/global-temperature.component';
import { Co2Component } from './componenti/co2/co2.component';
import { MethaneComponent } from './componenti/methane/methane.component';
import { No2Component } from './componenti/no2/no2.component';
import { PolarIceComponent } from './componenti/polar-ice/polar-ice.component';

export const routes: Routes = [
  {path:'', component: HomepageComponent},
  {path:'temperature', component: GlobalTemperatureComponent},
  {path:'co2', component: Co2Component},
  {path:'methane', component: MethaneComponent},
  {path:'no2', component: No2Component},
  {path:'ice', component: PolarIceComponent},
];
