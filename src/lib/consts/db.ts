enum Collections
{
    Character = "characters",
    Config = "configs",
    Entity = "entities",
    Genres = "genres",
    Role = "roles",
    Scene = "scenes",
    Story = "stories",
    User = "users",
    Upload = "uploads",
    Menu = "menus",
    Permission = "permissions"
}

export const DB_NAME = process.env.DB_NAME;

export default Collections;