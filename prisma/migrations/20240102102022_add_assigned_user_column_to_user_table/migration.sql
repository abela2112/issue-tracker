-- AlterTable
ALTER TABLE `issue` ADD COLUMN `AssignUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_AssignUserId_fkey` FOREIGN KEY (`AssignUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
