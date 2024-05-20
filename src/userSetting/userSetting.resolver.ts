import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserSetting } from './userSetting.model';
import { UserSettingService } from './userSetting.service';
import { createUserSettingInput } from './userSetting.type';

@Resolver()
export class UserSettingResolver {
  constructor(private userSettingsService: UserSettingService) {}

  @Mutation((returns) => UserSetting)
  async createUserSettings(
    @Args('createUserSettingsData')
    createUserSettingsData: createUserSettingInput,
  ) {
    const userSetting = await this.userSettingsService.createUserSettings(
      createUserSettingsData,
    );
    return userSetting;
  }
}
