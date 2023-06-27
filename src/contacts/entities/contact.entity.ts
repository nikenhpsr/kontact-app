import { Contact } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/users/entities/user.entity";

export class ContactEntity implements Contact {
    @ApiProperty()
    id: string;
    createdAt: Date;
    updatedAt: Date;
    @ApiProperty()
    profilePhoto: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    address: string;
    @ApiProperty()
    notes: string;
    @ApiProperty()
    userId: string;
    @ApiProperty({ required: false, type: UserEntity })
    user?: UserEntity;

    constructor({ user, ...data }: Partial<ContactEntity>) {
        Object.assign(this, data);

        if (user) {
            this.user = new UserEntity(user);
        }
    }
}
