use tauri::App;
use super::app_configurator_factory::create_app_configurator;

pub fn create_app() -> Result<App, Box<dyn std::error::Error>> {
    let mut app = tauri::Builder::default().build(tauri::generate_context!())?;
    let app_configurator = create_app_configurator(std::env::consts::OS)?;
    app_configurator.configure_app(&mut app)?;
    Ok(app)
}