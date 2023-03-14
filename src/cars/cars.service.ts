import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid'
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './interfaces/car.interface';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: "Toyota",
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: "Honda",
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: "Jeep",
            model: 'Cherokee'
        }
    ]

    findAll(){
        return this.cars;
    }

    findById(id: string){
        const car = this.cars.find( car => car.id === id)
        if(!this.cars) throw new NotFoundException(`Car with id '${id}' not found`); 
        return car
    }

    create(car: CreateCarDto){
        const newCar: Car = {
            id: uuid(),
            ...car
        }
        this.cars.push(newCar)
        return newCar
    }

    update(id: string, updateCarDto: UpdateCarDto){
        let carDB = this.findById(id);

        this.cars = this.cars.map(car => {
            if (car.id === id){
                carDB = {
                    ...carDB,
                    ...updateCarDto,
                    id
                }
                return carDB
            }
            return car;
        })
    }

    delete(id:string){
        const car = this.findById(id);
        this.cars = this.cars.filter(car => car.id !== id);    
    }

    fillCarsWithSeedData( cars: Car[]){
        this.cars = cars;
    }    

}
