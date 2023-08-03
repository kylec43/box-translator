use tauri::{App, Builder, Wry};

use crate::commands::system::{get_physical_screen_size, __cmd__get_physical_screen_size};

pub fn create_app() -> Result<App, Box<dyn std::error::Error>> {
    let mut builder = tauri::Builder::default();
    builder = register_invoke_handlers(builder);
    let app = builder.build(tauri::generate_context!())?;
    Ok(app)
}

pub fn register_invoke_handlers(builder: Builder<Wry>) -> Builder<Wry> {
    builder
        .invoke_handler(tauri::generate_handler![get_physical_screen_size])
}