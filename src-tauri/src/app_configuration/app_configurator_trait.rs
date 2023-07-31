use tauri::App;

pub trait AppConfiguratorTrait {
    fn configure_app<'a>(&self, app: &'a mut App) -> Result<&'a mut App, Box<dyn std::error::Error>>;
}