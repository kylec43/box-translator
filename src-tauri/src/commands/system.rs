use serde::Serialize;
use crate::factories::screen_util_factory::create_screen_util;

#[derive(Serialize)]
struct ScreenSize {
    width: u32,
    height: u32
}

#[tauri::command]
pub fn get_physical_screen_size() -> Result<String, String> {
    let screen_util = create_screen_util();
    if let Err(error) = screen_util {
        return Err(error.to_string());
    }

    let screen_util = screen_util.unwrap();
    let width = screen_util.get_screen_width();
    let height = screen_util.get_screen_height();

    let screen_size = ScreenSize { width, height };
    let json = serde_json::to_string(&screen_size);
    if let Err(error) = json {
        return Err(error.to_string());
    }

    Ok(json.unwrap())
}