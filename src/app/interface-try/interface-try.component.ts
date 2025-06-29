import { Component } from '@angular/core';

interface Employee {
  id: number;
  name: string;
  email: string;
}

interface tyrOptionalArray {
  productId: number;
  productName: string;
  isAvailable?: {
    cost: number;
  }
}

interface TryAnotherProduct {
  productId: number;
  isAvailable?: {
    cost: number;
  }
}

interface withOptionalAndArray {
  id: number;
  details: string[];
  isAvailable?: {
    cost: number
  }
}


interface UtilityEx {
  partialUser: Partial<Employee>;
  allRequired: Required<Employee>;
  pickUser: Pick<Employee, 'id' | 'email'>;
  ignoreOmit: Omit<Employee, 'email'>;
  recordData: Record<string, boolean>;
  readOnly: Readonly<Employee>
}

interface ApiRRRR<T> {
  id: number,
  responseData: Employee[],
  success: boolean
}

interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;

}


@Component({
  selector: 'app-interface-try',
  imports: [],
  templateUrl: './interface-try.component.html',
  styleUrl: './interface-try.component.scss'
})
export class InterfaceTryComponent {

  sampleUser: Employee = {
    id: 1,
    name: "Balaji",
    email: "asd@asd.com"
  }

  myOne: withOptionalAndArray = {
    id: 1,
    details: ["A", "B"],
    isAvailable: {
      cost: 23
    }

  }

  myUtilityExample: UtilityEx = {
    partialUser: { name: 'Balaji', id: 2 },
    allRequired: { id: 1, name: 'Balaji', email: "test" },
    ignoreOmit: { id: 1, name: 'Balaji' },
    pickUser: { id: 1, email: 'asdasd' },
    recordData: { admin: true, name: false },
    readOnly: { id: 1, name: 'balaji', email: 'asdasd' }
  }

  fromApi: ApiRRRR<Employee> = {
    id: 1,
    responseData: [this.sampleUser],
    success: true
  }

  calculate: Calculator = {
    add: (a: number, b: number) => a + b,
    subtract: (a: number, b: number) => a - b,
    divide: (a: number, b: number) => b !== 0 ? a / b : 0,
    multiply: (a: number, b: number) => a * b
  }

  Add = this.calculate.add(1, 2);
  sub = this.calculate.subtract(1, 2)


  myNewProdutc: TryAnotherProduct = {
    productId: 1,
    isAvailable: {
      cost: 22
    }
  }

  prodyct: tyrOptionalArray = {
    productId: 1,
    productName: "Balaji",
    isAvailable: {
      cost: 22
    }
  }

}
