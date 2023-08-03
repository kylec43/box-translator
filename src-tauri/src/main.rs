// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod factories;
mod lib_wrappers;
mod util;
mod commands;

use factories::app_factory::create_app;

fn main() {
  let app = create_app();
  if let Err(message) = app {
      todo!("Need to handle app creation error: {}", message);
  }
  let app = app.unwrap();
  app.run(|_, _| {});
}