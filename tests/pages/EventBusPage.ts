import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class EventBusPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get parentComponent() { 
    return this.page.getByText('Parent Component'); 
  }
  
  get childComponent() { 
    return this.page.getByText('Child Component'); 
  }
  
  get userMessage() { 
    return this.page.getByText('User: Default User (ID: 1)'); 
  }
  
  get userId() { 
    return this.page.getByText('ID: 1'); 
  }
  
  get userName() { 
    return this.page.getByText('Name: Default User'); 
  }

  // Actions
  async navigateToEventBusDemo() {
    await this.navigateTo('/event-bus/parent');
  }

  async verifyEventBusCommunication() {
    await this.parentComponent.waitFor({ state: 'visible' });
    await this.childComponent.waitFor({ state: 'visible' });
    await this.userMessage.waitFor({ state: 'visible' });
  }

  async verifyUserDetails() {
    await this.userId.waitFor({ state: 'visible' });
    await this.userName.waitFor({ state: 'visible' });
  }
}
