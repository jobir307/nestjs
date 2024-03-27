import { Column, Model, Table } from "sequelize-typescript";
import { User } from "src/modules/user/model/user.model";
@Table({
    tableName: 'watchlists'
})
export class Watchlist extends Model{
    @Column
    user: User

    @Column
    name: string

    @Column
    assetId: string
}