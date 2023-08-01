use tauri::{PhysicalPosition, PhysicalSize, Position, Size, Window};

pub struct WindowWrapper {
    window: Window,
}

impl WindowWrapper {
    pub fn new(window: Window) -> WindowWrapper {
        WindowWrapper { window }
    }

    pub fn set_physical_size(&mut self, width: u32, height: u32) -> &mut WindowWrapper {
        let _ = self
            .window
            .set_size(Size::Physical(PhysicalSize { width, height }));
        self
    }

    pub fn set_physical_position(&mut self, x: i32, y: i32) -> &mut WindowWrapper {
        let _ = self
            .window
            .set_position(Position::Physical(PhysicalPosition { x, y }));
        self
    }

    pub fn set_physical_min_size(&mut self, width: u32, height: u32) -> &mut WindowWrapper {
        let _ = self
            .window
            .set_min_size(Some(Size::Physical(PhysicalSize { width, height })));
        self
    }

    pub fn show(&mut self) -> Result<&mut WindowWrapper, Box<dyn std::error::Error>> {
        self.window.show()?;
        Ok(self)
    }

    pub fn set_decorations(&mut self, flag: bool) -> Result<&mut WindowWrapper, Box<dyn std::error::Error>> {
        self.window.set_decorations(flag)?;
        Ok(self)
    }
}
