module RecipeHelper
  def include_cookbook(name)
    name1, name2 = name.split('::')
    name2 ||= 'default'
    include_recipe File.join(__dir__, 'cookbooks', name1, name2 + '.rb')
  end

  def include_role(name)
    name1, name2 = name.split('::')
    name2 ||= 'default'
    include_recipe File.join(__dir__, 'roles', name1, name2 + '.rb')
  end
end
Itamae::Recipe::EvalContext.include(RecipeHelper)

node[:roles].split(',').each do |role|
  begin
    include_role role
  rescue
    Itamae::Recipe::NotFoundError
  end
end
