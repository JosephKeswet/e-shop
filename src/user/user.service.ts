import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as admin from 'firebase-admin';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async addProfilePhoto(file: Express.Multer.File, id: number): Promise<any> {
        // Upload the file to Firebase Storage
        const storageBucket = admin.storage().bucket('gs://e-shop-e3b88.appspot.com/'); // Get the default storage bucket

        // Define the destination path in Firebase Storage (e.g., 'profile_photos')
        const destination = 'photos';
        const fileName = `${destination}/${Date.now()}_${file.originalname}`;
        const fileUpload = storageBucket.file(fileName);
        const stream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        await new Promise((resolve, reject) => {
            stream.on('finish', resolve);
            stream.on('error', reject);
            stream.end(file.buffer);
        });

        const storage = await admin.storage().bucket('gs://e-shop-e3b88.appspot.com/').file(fileName).getMetadata()

        // Update the user's profile photo in the database
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                profilePhoto: `https://storage.googleapis.com/${storageBucket.name}/${fileUpload.name}`,
            },
        });

        // Remove sensitive data from the user object before returning
        delete updatedUser.hash;

        return {
            success: true,
            msg: 'You have successfully added a profile photo',
            user: updatedUser,
        };
    }
}
