export enum EnumGetStoryMetaTitleGroup {
  COMPONENTS = 'Components/',
  HOOKS = 'Hooks/',
}

export interface GetStoryMetaTitleOptions {
  group?: EnumGetStoryMetaTitleGroup
  componentName: string
}

export const getStoryMetaTitle = ({
  group = EnumGetStoryMetaTitleGroup.COMPONENTS,
  componentName,
}: GetStoryMetaTitleOptions) => {
  return group + componentName
}
