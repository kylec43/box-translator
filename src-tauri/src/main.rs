// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod factories;
mod lib_wrappers;
mod window_decoration;
mod util;
use factories::{screen_util_factory::create_screen_util, window_decorator_factory::{create_console_decorator, create_default_decorator}};
use lib_wrappers::window_wrapper::WindowWrapper;
use tauri::{App, Manager};

fn main() {
  let app = create_app();
  if let Err(message) = app {
      todo!("Need to handle app creation error: {}", message);
  }
  let app = app.unwrap();
  app.run(|_, _| {});
}

fn create_app() -> Result<App, Box<dyn std::error::Error>> {
  let app = tauri::Builder::default().build(tauri::generate_context!())?;
  
  if let Some(window) = app.get_window("main") {
    let mut window = WindowWrapper::new(window);
    configure_initial_window(&mut window)?;
  }

  Ok(app)
}

fn configure_initial_window(window: &mut WindowWrapper) -> Result<(), Box<dyn std::error::Error>> {
  let screen_util = create_screen_util()?;
  let console_decorator = create_console_decorator(screen_util);
  console_decorator.decorate(window)?;
  window.show()?;
  Ok(())
}