<?php

class AreaChecker {
    public static function isInArea($x, $y, $r) {
        if ($x >= 0 && $y <= 0) { // Check for circle in bottom-right quadrant
            return ($x * $x + $y * $y) <= ($r * $r);
        }
        if ($x >= 0 && $y >= 0) { // Check for square in the top-right quadrant
            return ($x <= $r) && ($y <= $r);
        }
        if ($x >=  0 && $y < 0) { // Check for triangle in top-left quadrant
            return ($x >= -$r / 2) && ($y <= $r / 2) && ($x - $y >= -$r /2);
        }
        return false; // For bottom-left quadrant, always return false
    }
}
