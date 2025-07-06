import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {



  activeLink: string = 'Home';

  constructor(private router: Router) { }

  setActiveLink(linkName: string): void {
    this.activeLink = linkName;
  }

  isActive(linkName: string): boolean {
    return this.activeLink === linkName;
  }
  navigateToNgrx(): void {
    this.router.navigate(['/dashboard/ngrx']);
    this.setActiveLink('NgRx');
  }

  navigateToHome(): void {
    this.router.navigate(['/dashboard/home']);
    this.setActiveLink('Home');
  }

  navigateToSeniorAngular() {
    this.router.navigate(['/dashboard/senior-angular']);
    this.setActiveLink('SeniorAngular');
  }

  navigateToLazyLoading() {
    this.router.navigate(['/dashboard/lazy-loading']);
    this.setActiveLink('LazyLoading');
  }

  navigateToDependencyInjection() {
    this.router.navigate(['/dashboard/dependency-injection']);
    this.setActiveLink('DependencyInjection');
  }
  navigateToContentProjection() {
    this.router.navigate(['/dashboard/content-projection']);
    this.setActiveLink('ContentProjection');
  }

  navigateToNgContainerTemplate() {
    this.router.navigate(['/dashboard/ng-container-template']);
    this.setActiveLink('NgContainerTemplate');
  }

  navigateToParentChildDemo() {
    this.router.navigate(['/dashboard/parent-child-demo']);
    this.setActiveLink('ParentChildDemo');
  }

  navigateToSignals() {
    this.router.navigate(['/dashboard/signals']);
    this.setActiveLink('Signals');
  }

  navigateToCircularDependency() {
    this.router.navigate(['/dashboard/circular-dependency']);
    this.setActiveLink('CircularDependency');
  }

  navigateToExamples() {
    this.router.navigate(['/dashboard/examples']);
    this.setActiveLink('Examples');
  }

  navigateToSpreadOperator() {
    this.router.navigate(['/dashboard/spread-operator']);
    this.setActiveLink('SpreadOperator');
  }

  navigateToInterface() {
    this.router.navigate(['/dashboard/interface']);
    this.setActiveLink('Interface');
  }

  navigateToCreatingTypes() {
    this.router.navigate(['/dashboard/creating-types']);
    this.setActiveLink('CreatingTypes');
  }

  navigateToGenerics() {
    this.router.navigate(['/dashboard/generics']);
    this.setActiveLink('Generics');
  }

  navigateToUnionTypes() {
    this.router.navigate(['/dashboard/union-types']);
    this.setActiveLink('UnionTypes');
  }

  navigateToConstructorSyntax() {
    this.router.navigate(['/dashboard/constructor-syntax']);
    this.setActiveLink('ConstructorSyntax');
  }

  navigateToNgrxForm() {
    this.activeLink = 'ngrx-form';
    this.router.navigate(['/dashboard/ngrx-form']);
  }

}
