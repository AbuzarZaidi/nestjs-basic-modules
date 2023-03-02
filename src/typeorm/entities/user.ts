import { Entity, PrimaryColumn , Column } from "typeorm"

@Entity(
    {name:'users'}
)
export class User {
    @PrimaryColumn()
    id: string
    @Column()
    name: string
    @Column({unique:true})
    email: string
    @Column()
    password: string
}