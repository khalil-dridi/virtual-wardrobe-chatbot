import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HowItWorkComponent } from './how-it-work/how-it-work.component';
import { HomeServiceComponent } from './home-service/home-service.component';
import { RegisterComponent } from './register/register.component';
import { LeftContainerComponent } from './left-container/left-container.component';
import { RightContainerComponent } from './right-container/right-container.component';
import { CategorieComponent } from './categorie/categorie.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { WardrobeComponent } from './wardrobe/wardrobe.component';
import { EventComponent } from './event/event.component';
import { SidebareComponent } from './sidebare/sidebare.component';
import { WeatherRecommendationModalComponent } from './weather-recommendation-modal/weather-recommendation-modal.component';
import { ClothingCategoriesComponent } from './clothing-categories/clothing-categories.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { EventListComponent } from './event-list/event-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TendenceComponent } from './tendence/tendence.component';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { TendenceCrudComponent } from './tendence-crud/tendence-crud.component';
import { AuthGuard1 } from './guards/auth1.guard';
import { UserCrudComponent } from './user-crud/user-crud.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
{path:"weather",component:WeatherComponent ,canActivate: [AuthGuard]},
{path:"account",component:AccountComponent,canActivate: [AuthGuard]},
{path:"footer",component:FooterComponent,canActivate: [AuthGuard]},
{path:"navbar",component:NavbarComponent,canActivate: [AuthGuard]},
{path:"howitwork",component:HowItWorkComponent,canActivate: [AuthGuard]},
{path:"service",component:HomeServiceComponent,canActivate: [AuthGuard]},
{path:"register",component:RegisterComponent},
{path:"leftmeteo",component:LeftContainerComponent,canActivate: [AuthGuard]},
{path:"rightmeteo",component:RightContainerComponent,canActivate: [AuthGuard]},
{path:"categorie",component:CategorieComponent,canActivate: [AuthGuard]},
{path:"calendar",component:CalendarComponent,canActivate: [AuthGuard]},
{path:"chatbot",component:ChatbotComponent,canActivate: [AuthGuard]},
{path:"wardrob",component:WardrobeComponent ,canActivate: [AuthGuard]},
{path:"event",component:EventComponent},
{path:"sidebar",component:SidebareComponent,canActivate: [AuthGuard]},
{path:"weatherRecommendation",component:WeatherRecommendationModalComponent,canActivate: [AuthGuard]},
{path:"profil",component:UserProfileComponent,canActivate: [AuthGuard]},
{path:"eventList",component:EventListComponent,canActivate: [AuthGuard]}, 
{path:"side",component:SidebarComponent,canActivate:[AuthGuard]},
{path:"tendence",component:TendenceComponent,canActivate:[AuthGuard]},
{path:"login",component:AdminAuthComponent},
{path:"tendences",component:TendenceCrudComponent,canActivate:[AuthGuard1]},
{path:"users",component:UserCrudComponent,canActivate:[AuthGuard1]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
