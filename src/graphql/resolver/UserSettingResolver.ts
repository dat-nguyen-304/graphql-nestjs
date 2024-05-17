import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSetting } from '../models/UserSetting';
import { createUserSettingInput } from '../utils/CreateUserSettingInput';
import { userSettings } from 'src/__mock__/MockUserSettings';

@Resolver()
export class UserSettingResolver {
  @Mutation((returns) => UserSetting)
  createUserSettings(
    @Args('createUserSettingData')
    createUserSettingData: createUserSettingInput,
  ) {
    userSettings.push(createUserSettingData);
    return createUserSettingData;
  }
}
